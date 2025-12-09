import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

// Hero slideshow images in /public
const HERO_IMAGES = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg", "/hero4.jpg"];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change hero background every 6 seconds
  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return;

    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  const currentImage = HERO_IMAGES[currentIndex];

  return (
    <div className={styles.page}>
      <Head>
        <title>Travel Multiverse</title>
        <meta
          name="description"
          content="Turn your mood, imagination, or even a photo into a travel itinerary."
        />
      </Head>

      <main>
        {/* HERO – full-width slideshow */}
        <section
          className={styles.hero}
          style={{ backgroundImage: `url(${currentImage})` }}
        >
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>TRAVEL MULTIVERSE</h1>

            <p className={styles.heroTagline}>
              Turn your mood, imagination, or even a photo into a travel itinerary.
            </p>

            <p className={styles.heroSubline}>
              Where your emotions turn into paths. Where your imagination becomes a map.
            </p>

            <Link href="/trip-details" className={styles.heroButton}>
              Start Your Journey
            </Link>

            <p className={styles.heroNote}>No login needed — just wander.</p>
          </div>
        </section>

        {/* Mascot section (button removed as per UX) */}
        <section className={styles.videoSection}>
          <div className={styles.videoText}>
            <h2 className={styles.videoEyebrow}>JUST ADD MAGIC</h2>
            <h3 className={styles.videoTitle}>Travel Mascot Animation</h3>
            <p className={styles.videoDescription}>
              Your travel mascot brings the multiverse to life with subtle motion,
              capturing the calm, inspiring feeling of stepping into a dream
              destination.
            </p>
          </div>

          <div className={styles.videoWrapper}>
            <video
              className={styles.video}
              src="/mascot.mp4"
              controls
              playsInline
              poster="/video-poster.jpg"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
