import NavWrapper from "@/components/ui/NavWrapper";
import { getVideos } from "../../../../../sanity/sanity-utils";

import styles from "@/components/video/video.module.css";
import Footer from "@/components/ui/Footer";

type ParamsType = {
  slug: string;
  locale: "de" | "en";
};

export default async function page({ params }: { params: ParamsType }) {
  const videos = await getVideos();

  const video = videos.find(
    (video: { slug: { current: string } }) => video.slug.current == params.slug
  );

  return (
    <main>
      <NavWrapper locale={params.locale} />
      <section className={styles.wrapper}>
        <div className={styles.videoContainer}>
          <iframe
            src={`https://player.vimeo.com/video/${video.id}?background=0&autoplay=0&loop=0&title=0&byline=0&portrait=0&controls=1`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
        <Footer />
      </section>
    </main>
  );
}
