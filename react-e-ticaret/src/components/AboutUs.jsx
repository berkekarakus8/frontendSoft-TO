export default function AboutUs() {
  return (
    <>
      <main className="about-container">
        <div className="about-header">
          <span className="about-subtitle">{ABOUT.DATA.subtitle}</span>
          <h1 className="about-title">{ABOUT.DATA.title}</h1>
        </div>
        <div className="about-body">
          <p className="about-text">{ABOUT.DATA.text1}</p>
          <p className="about-text">{ABOUT.DATA.text2}</p>
          <div className="about-values-grid">
            {ABOUT_DATA.values.map((val) => (
              <div key={val.title} className="value-card">
                <h3 className="value-title">{val.title}</h3>
                <p className="value-desc">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
