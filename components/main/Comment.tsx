"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { MessageCircle, Send, Loader2, UserCircle2 } from "lucide-react";

interface Comment {
  id: number;
  user_name: string;
  content: string;
  image_url?: string | null;
  created_at?: string;
}

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ once: false, duration: 900, easing: "ease-out-cubic" });
    fetchComments();

    const channel = supabase
      .channel("comments-live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        () => fetchComments(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error.message);
      return;
    }
    setComments(data || []);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !message) return;
    setLoading(true);

    try {
      const { error } = await supabase.from("comments").insert({
        user_name: name,
        content: message,
      });

      if (!error) {
        setName("");
        setMessage("");
        await fetchComments();
      }
    } finally {
      setLoading(true);
      setLoading(false);
    }
  };

  return (
    <section id="comments" className="w-full h-full">
      <div
        data-aos="fade-up"
        className="w-full h-full max-w-3xl mx-auto flex flex-col bg-linear-to-b from-white/10 to-white/5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* HEADER */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20">
            <MessageCircle className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            Comments{" "}
            <span className="text-indigo-400">({comments.length})</span>
          </h3>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6 flex flex-col">
          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-white font-medium">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-2 w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm text-white font-medium">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                className="mt-2 w-full p-4 min-h-[100px] resize-none rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full h-12 bg-indigo-600 rounded-xl font-medium text-white flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Post Comment
            </button>
          </form>

          <div className="custom-scroll max-h-[495px] overflow-y-auto space-y-4 mt-2 pr-2">
            {comments.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex gap-3">
                  {c.image_url ? (
                    <Image
                      src={c.image_url}
                      alt={c.user_name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <UserCircle2 className="w-10 h-10 text-indigo-400" />
                  )}
                  <div>
                    <p className="text-white font-medium">{c.user_name}</p>
                    <p className="text-gray-300 text-sm">{c.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comments;
