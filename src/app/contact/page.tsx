import styles from './contact.module.css';

export default function Contact() {
  return (
    <main className="container">
      <div className={styles.contactPage}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.contactInfo}>
            <h2>Get in Touch</h2>
            <div className={styles.infoItem}>
              <strong>Email:</strong>
              <a href="mailto:hello@productstore.com">hello@productstore.com</a>
            </div>
            <div className={styles.infoItem}>
              <strong>Phone:</strong>
              <a href="tel:+1234567890">+1 (234) 567-8900</a>
            </div>
            <div className={styles.infoItem}>
              <strong>Address:</strong>
              <span>123 Product Street, Commerce City, CC 12345</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Business Hours:</strong>
              <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
            </div>
          </div>

          <div className={styles.contactForm}>
            <h2>Send us a Message</h2>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={6} required></textarea>
              </div>
              
              <button type="submit" className={styles.submitBtn}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
