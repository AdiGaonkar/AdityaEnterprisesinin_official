import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "./Navbar";
import Collaborate from "./Collaborate";

type FormStatus = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_lio1pis",
        "template_pvemfa4",
        formRef.current,
        "uf5g6o_BiofBLYRp-"
      )
      .then(
        () => {
          setStatus("success");
          formRef.current?.reset();

          // reset success state after few seconds
          setTimeout(() => setStatus("idle"), 4000);
        },
        () => {
          setStatus("error");
        }
      );
  };

  return (
    <>
    <div className="relative min-h-screen bg-gradient-to-b from-[#7834c8] via-[#7834c8] to-black">
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage:
            "url('')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0" />
        <Navbar />
        {/* Content */}
        <div className="relative mt-10 z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 px-8">
          
          {/* LEFT TEXT */}
          <div className="hidden md:flex w-[800px] -ml-20 flex-col justify-center">
            <h2 className="text-white text-7xl font-stacksansnotch font-thin leading-tight">
              Let’s build <br /> something great
            </h2>
            <p className="mt-6 text-gray-300 max-w-md">
              Tell us about your idea and we’ll help you turn it into a
              high-impact digital experience.
            </p>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-black/30 backdrop-blur-lg p-12 rounded-xl shadow-xl">
            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="space-y-5 text-white"
            >
              <h2 className="text-[25px] font-semibold">
                Contact Aditya(Techno Services)
              </h2>

              <p className="text-sm text-gray-300">
                Fill out the form and we’ll get back to you shortly.
              </p>

              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                required
                className="w-full p-3 bg-transparent border border-gray-400 rounded-md outline-none focus:border-white transition"
              />

              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                required
                className="w-full p-3 bg-transparent border border-gray-400 rounded-md outline-none focus:border-white transition"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full p-3 bg-transparent border border-gray-400 rounded-md outline-none focus:border-white transition"
              />

              <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                required
                className="w-full p-3 bg-transparent border border-gray-400 rounded-md outline-none resize-none focus:border-white transition"
              />

              {/* Hidden fields for EmailJS */}
              <input type="hidden" name="year" value={new Date().getFullYear()} />
              <input type="hidden" name="source" value="Website Contact Form" />

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-white text-black py-3 rounded-md font-medium hover:bg-gray-200 transition disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="text-sm text-green-400 text-center">
                  Message sent successfully 🚀 We’ll be in touch soon.
                </p>
              )}

              {status === "error" && (
                <p className="text-sm text-red-400 text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
      </div>
      <Collaborate/>
    </>
  );
};

export default Contact;
