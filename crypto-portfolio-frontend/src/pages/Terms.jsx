import React from "react";
import dashboardVideo from "../assets/acpdani.mp4"; // background video

export default function Terms() {
  return (
    <div style={styles.page}>
      {/* Background Video */}
      <video
        src={dashboardVideo}
        autoPlay
        loop
        muted
        playsInline
        style={styles.video}
      />
      {/* Dark Overlay */}
      <div style={styles.overlay} />

      <div style={styles.wrapper}>
        <h1 style={styles.title}>Terms & Conditions</h1>
        <p style={styles.text}>
          By using Crypto Portfolio Tracker, you agree to our terms and conditions. Please read carefully before using our platform.
        </p>
        <p style={styles.text}>
          The platform is for informational and tracking purposes only. We are not responsible for any financial losses incurred while using the service.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
    color: "#fff",
    overflow: "hidden",
    padding: "20px",
  },
  video: {
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -2,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)", // dark overlay
    zIndex: -1,
  },
  wrapper: {
    padding: "50px 30px",
    minHeight: "80vh",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    margin: "20px auto",
    maxWidth: "900px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
    zIndex: 10,
  },
  title: {
    fontSize: "36px",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "700",
    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
  },
  text: {
    fontSize: "18px",
    lineHeight: "1.8",
    marginBottom: "15px",
    textAlign: "justify",
  },
};
