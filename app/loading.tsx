
export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-whatsapp-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading WhatsApp Web...</p>
      </div>
    </div>
  );
}