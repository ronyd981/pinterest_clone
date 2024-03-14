export default function HeaderInfo() {
  return (
    <div className="w-64 flex flex-col gap-1 mx-auto">
      <h1
        className="
        text-xl font-medium text-center
        md:text-2xl
      "
      >
        Edit profile
      </h1>
      <p
        className="
        text-sm text-secondary-gray text-center
      "
      >
        Keep your personal details private. Information you add here is visible
        to any who can view your profile.
      </p>
    </div>
  );
}
