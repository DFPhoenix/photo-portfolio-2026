export const metadata = { title: "Contact — Studio" }

export default function ContactPage() {
  return (
    <div className="px-8 pt-12 pb-16 max-w-xl">
      <header className="mb-12">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Get in Touch</p>
        <h2 className="text-2xl font-extralight tracking-widest text-white uppercase">Contact</h2>
      </header>

      <p className="text-white/50 text-sm leading-relaxed tracking-wider mb-12">
        Whether you&apos;re planning a wedding, looking for portrait sessions, or have a project in
        mind — I&apos;d love to hear from you.
      </p>

      <form className="flex flex-col gap-6" action="#" method="POST">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-[0.35em] uppercase text-white/40">Name</label>
          <input
            type="text"
            name="name"
            required
            className="bg-transparent border-b border-white/20 focus:border-white/60 outline-none py-2 text-white text-sm tracking-wider placeholder:text-white/20 transition-colors duration-200"
            placeholder="Your name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-[0.35em] uppercase text-white/40">Email</label>
          <input
            type="email"
            name="email"
            required
            className="bg-transparent border-b border-white/20 focus:border-white/60 outline-none py-2 text-white text-sm tracking-wider placeholder:text-white/20 transition-colors duration-200"
            placeholder="your@email.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-[0.35em] uppercase text-white/40">Message</label>
          <textarea
            name="message"
            rows={5}
            required
            className="bg-transparent border-b border-white/20 focus:border-white/60 outline-none py-2 text-white text-sm tracking-wider placeholder:text-white/20 transition-colors duration-200 resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        <button
          type="submit"
          className="mt-4 self-start text-[11px] tracking-[0.45em] uppercase border border-white/40 px-10 py-3 text-white/60 hover:text-white hover:border-white hover:bg-white/5 transition-all duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}
