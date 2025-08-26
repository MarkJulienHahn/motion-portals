export const metadata = {
  title: "Backend | Motion Portals",
  description: "Welcome to the Backend of Motion Portals",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <div className="admin-layout">{children}</div>
      </body>
    </html>
  );
}
