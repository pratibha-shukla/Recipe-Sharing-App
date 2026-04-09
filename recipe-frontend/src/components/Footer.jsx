export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center p-4 mt-5">
      <h5>Recipe Sharing App</h5>
      <p>📞 +1 555-123-4567 | 🌐 www.recipeshare.com</p>

      <div className="d-flex justify-content-center gap-4">
        <a href="https://facebook.com" className="text-white">Facebook</a>
        <a href="https://instagram.com" className="text-white">Instagram</a>
        <a href="https://twitter.com" className="text-white">Twitter</a>
      </div>

      <p className="mt-3">© 2026 All Rights Reserved</p>
    </footer>
  );
}
