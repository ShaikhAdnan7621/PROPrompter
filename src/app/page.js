import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="max-w-[1280px] mx-auto flex min-h-screen flex-col items-center justify-between bg-gray-100">
            <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-5">
                <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                        Unlock Your Writing Potential with PROPrompter
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mt-4">
                        {"Discover a world of endless writing possibilities. Find inspiration, generate unique content, and break through writer's block."}
                    </p>
                    <div className="mt-8">
                        <Link href="/prompts/gallery">
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
                                Explore PROPrompter
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="md:w-1/2 p-0">
                    <Image
                        src="/images/heroimage1.jpg" // Replace with your hero image
                        alt="Hero Image"
                        width={500}
                        height={500}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
            </section>

            {/* Features Section (Example) */}
            <section className="container mx-auto px-4 py-16 bg-white">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Why Choose PROPrompter?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="text-center">
                        <div className="bg-green-100 rounded-full p-4 mx-auto mb-4 flex justify-center gap-4 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8 text-green-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v12m-3-3h6m-3-3v6"
                                />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Diverse Prompts
                            </h3>
                        </div>
                        <p className="text-gray-600 mt-2">
                            Explore a wide variety of prompt categories to spark your
                            imagination.
                        </p>
                    </div>

                    {/* Feature 2  */}
                    <div className="text-center">
                        <div className="bg-green-100 rounded-full p-4 mx-auto mb-4 flex justify-center gap-4 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8 text-green-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v8m8-8h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h8z"
                                />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Easy to Use
                            </h3>
                        </div>
                        <p className="text-gray-600 mt-2">
                            Our user-friendly interface makes it simple to find and use
                            prompts.
                        </p>
                    </div>

                    {/* Feature 3  */}
                    <div className="text-center">
                        <div className="bg-green-100 rounded-full p-4 mx-auto mb-4 flex justify-center gap-4 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8 text-green-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0h3m-3 0v3m3 0v3m-3 0h3m-3 0h3m-3 0v3m3-3h3m-3 0h3"
                                />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Boost Your Creativity
                            </h3>
                        </div>
                        <p className="text-gray-600 mt-2">
                            {"Overcome writer's block and unlock your full creative potential."}
                        </p>
                    </div>
                </div>
            </section>
            <section className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Ready to Start Writing?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    Join our community of writers and unlock your creative potential.
                </p>
                <Link href="/auth/signup">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
                        Sign Up for Free
                    </button>
                </Link>
            </section>
        </main>
    );
}