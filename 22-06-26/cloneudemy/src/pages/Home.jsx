export default function Home() {
  return (
    <div className="space-y-xl">
      <section className="mt-lg">
        <h2 className="text-heading-lg">Merhaba Sınıf</h2>
        <p className="text-body">Bugun ne ogrenmek isteriz?</p>
      </section>
      <section>
        <div className="search-bar-wrapper">
          <span className="material-symbols-outlined search-bar-icon">
            search
          </span>
          <input
            type="text"
            className="search-bar-input"
            placeholder="kurs,egitmen veya konu ara..."
          />
        </div>
      </section>
      <section className="category-chips-scroll no scrollbar">
        <button className="category-chip-active">Tumu</button>
        <button className="category-chip">Tasarım</button>
        <button className="category-chip">Yazılım</button>
        <button className="category-chip">Pazarlama</button>
        <button className="category-chip">İsletme</button>
      </section>
      <section>
        <div className="hero-card block">
          <div className="hero-overlay">
            <div
              className="hero-bg-img"
              style={{
                backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuCMhSTJBrMvCxohdOiO08I77jgTYR1qxRzpZfQ1h7CRQHKJ1E3ALBNF_zgFiEYB1Q0PND57ZzMOccOY-zHdzm85MEiNqUtWVEEx6DiFW0Nmasld9IXDr3_Wy_c3gIOm7QI4LaUi49ViVQyOVeX2cx13MjxR0uRl95wccrcrEZgGay5oEhHuoHzn4ZBMQ08T0olw9bOrPHsOam9e74LcIWNoEbgFZVQ1GUFzBLT6q35Cj0XDTABX_IJS9S4B_dPSbBpA8uQ9ubwkKckB)`,
              }}
            ></div>
            <div className="hero-text-container">
              <span className="badge-tag">One Cıkan</span>
              <h3 className="text-display-lg mt-2">
                UI/UX tasarım temelleri 2026
              </h3>
              <p className="herodescription">
                Profesyonel tasarımcı olmak icin gereken her sey bu kursta
              </p>
              <button className="btn-primary mt-4">Simdi Basla</button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2 className="text-headline-md">Populer Kurslar</h2>
          <div className="section-link">Tumunu gor</div>
        </div>
        <div className="courses-scroll-container no-scrollbar">
          <div className="course-card">
            <div className="course-card-img-wrapper">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhQPwyGG5o1HbU4-h8MOObahKD78oEfMkzeLMvXSACqNXpNwa_OpT0APRj2Jr3r44OU3F6YjJSCZ_RMVXDOYGn7EoJDnE9T1SUZYRt4_qM0lCiofbNH7sfGjxGyUoPnrJ1ORx5z3V7CRCvIGW9z9_tsxqmcSBgKE6XDI3RslRpv7qVcj76JGDPXbAVUVcs-RavQ1DKAagNuntoUJsmoP23IPpJ8zyoNBI0nBVWOHo411oRWWaszwKtHuTG7FU36YLDQCLg2m-8Q9VW"
                className="course-card-img"
              ></img>
              <span className="badge-bestseller-absolute">Cok Satan</span>
            </div>
            <div className="course-card-info">
              <div className="course-card-title">İleti Seviye React.js</div>
              <p className="course-card-author">Selahaddin ÇİFTÇİ</p>
              <div className="course-card-rating-row">
                <span className="text-label-md text-secondary">4.9</span>
                <div className="course-card-rating-stars">
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star_half</span>
                </div>
                <span className="text-caption text-outline">(2.859)</span>
              </div>
              <div className="course-card-footer">
                <span className="text-headline-md text-primary">259.99 TL</span>
                <span className="material-symbols-outlined course-card-fav-btn">
                  favorite
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
