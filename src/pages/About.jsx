import ShinyText from "../components/Ui/ShinyText";

const About = () => {
  const cards = [
    {
      title: "🌐 Who We Are",
      content: (
        <>
          Welcome to
          <strong className="text-gradient">
            <ShinyText
              text=" Movies World"
              disabled={false}
              speed={3}
              className="text-gradient px-1"
            />
          </strong>
          — your go-to destination for everything cinema! From Hollywood hits to
          indie series, we’ve got it all.
          <br />
          <br />
          Powered by
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline px-1"
          >
            TMDB
          </a>
          , we fetch real-time movie data.
        </>
      ),
    },
    {
      title: "🎯 Our Mission",
      content: (
        <>
          Making discovering and loving movies easier than ever. From casual
          fans to hardcore buffs — this is your cinema space.
        </>
      ),
    },
    {
      title: "📽️ Our Story",
      content: (
        <>
          Born from a love for React and cinema, Movies World started as a solo
          side project and grew into a platform for movie lovers everywhere.
        </>
      ),
    },
    {
      title: "💻 Open Source",
      content: (
        <>
          This project is open-source and built with ❤️. Explore it on
          <a
            href="https://github.com/jaimin-acharya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline px-1"
          >
            GitHub
          </a>
          .
        </>
      ),
    },
    {
      title: "🧑‍💻 Our Team",
      content: (
        <>
          Created by
          <strong>
            <a
              href="https://www.instagram.com/jaiminacharya9/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jaimin Acharya
            </a>
          </strong>
          — a developer and cinema lover.
        </>
      ),
    },
    {
      title: "🙏 Thank You!",
      content: (
        <>
          Thanks for being a part of our growing community. Let’s celebrate
          movies together!
        </>
      ),
    },
  ];

  return (
    <div className="wrapper py-10 px-2">
      <h1 className="text-white text-4xl sm:text-5xl font-bold mb-12 text-center">
        👋 About Us
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ title, content }, i) => (
          <section
            key={i}
            className="rounded-2xl p-6 bg-dark-100 shadow-xl space-y-4 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl hover:bg-dark-200"
          >
            <h3 className="text-white text-xl sm:text-2xl font-semibold">
              {title}
            </h3>
            <span className="text-gray-300 text-md leading-relaxed">{content}</span>
          </section>
        ))}
      </div>
    </div>
  );
};

export default About;
