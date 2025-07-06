import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//connect with database
connect();

export async function POST(request: NextRequest) {
  try {
    //data from request
    const reqBody = await request.json();
    const {email, password} = reqBody;

    console.log(reqBody);

    //Check if the user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User Doesn't Exist",
        },
        { status: 400 }
      );
    }

    //validate password .compare
    const validPassword = await bcrypt.compare(password, user.password); // user.password is the password from the datbase of the user and the simple password is from reqBody

    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Invalid password",
        },
        {
          status: 400,
        }
      );
    }

    //Create token now  and send the token into the user cookies for the session (secure cookies) -> acts as bridge when. we want to verify anuser

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      // ! to tell that this is absolutely coming
      expiresIn: "1d",
    });

    //set token to user cookie

    const response = NextResponse.json({
      message: "Logging In Successful ",
      sucess: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
