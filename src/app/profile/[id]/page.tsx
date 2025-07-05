export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold text-amber-300">User Profile</h1>
      <p className="mt-3"> 
        We Are watching profile id:{" "}
        <span className="text-black rounded-full px-4 py-2 bg-yellow-200">
          {params.id}{" "}
        </span>{" "}
      </p>
    </div>
  );
}
