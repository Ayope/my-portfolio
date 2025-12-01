import React from "react";

type Post = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: { name: string; avatar: string };
  likes: number;
  comments: number;
};

const DUMMY_POSTS: Post[] = [
  {
    id: 1,
    title: "My solopreneur story: $0 to $65,000/month in 2 years",
    excerpt:
      "After being fired I launched startups and built a repeatable growth loop that turned into sustainable revenue and community.",
    date: "Dec 23, 2023",
    category: "Personal",
    image: "https://picsum.photos/800/480?random=11",
    author: { name: "Ayoub El Ayouk", avatar: "https://i.pravatar.cc/64?img=12" },
    likes: 9,
    comments: 14,
  },
  {
    id: 2,
    title: "Ditch your free plan",
    excerpt:
      "Small product decisions compound in the long run. Learn how pricing and product choices impacted growth for my projects.",
    date: "Nov 25, 2023",
    category: "Product",
    image: "https://picsum.photos/800/480?random=12",
    author: { name: "Ayoub El Ayouk", avatar: "https://i.pravatar.cc/64?img=22" },
    likes: 3,
    comments: 14,
  },
  {
    id: 3,
    title: "How to get your first customer",
    excerpt:
      "If you have no audience and $0, here are the marketing strategies I used to acquire customers for early products.",
    date: "Apr 06, 2024",
    category: "Audience",
    image: "https://picsum.photos/800/480?random=13",
    author: { name: "Ayoub El Ayouk", avatar: "https://i.pravatar.cc/64?img=32" },
    likes: 13,
    comments: 3,
  },
];

export default function LatestBlogs() {
  return (
    <section id="blog" className="scroll-mt-20 md:scroll-mt-24 px-10 mt-20">
      <h2 className="text-center text-3xl font-bold mb-2">Latest Posts</h2>
      <p className="text-center text-green-400 mb-8">Featured articles & insights</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {DUMMY_POSTS.map((post) => (
          <article
            key={post.id}
            className="group bg-[#0f1114] rounded-xl overflow-hidden shadow-sm transition-transform transform hover:-translate-y-1 cursor-pointer"
          >
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute left-4 top-4 bg-green-400 text-black text-xs font-semibold px-2 py-1 rounded">
                {post.category}
              </span>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div>{post.date}</div>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mt-3 mb-2">{post.title}</h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

              <div className="flex items-center gap-3">
                <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-white">{post.author.name}</p>
                  <p className="text-xs text-gray-400">Author</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}