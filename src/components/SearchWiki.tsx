import { useState } from 'react';

type SearchWikiProps = {
  posts: any[];
  [key: string]: any; // permite client:load u otros
};

export default function SearchWiki({ posts }: SearchWikiProps) {
  const [query, setQuery] = useState('');

  // Filtramos los posts en base a lo que el usuario escribe
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full mb-12">
      <div className="relative group">
        <input
          type="text"
          placeholder="🔍 Buscar en los PowerPoints (ej: 'historia', 'vuelos')..."
          className="w-full p-4 pl-12 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="absolute left-4 top-4 opacity-30 group-focus-within:opacity-100 transition-opacity">
          🔎
        </span>
      </div>

      {query && (
        <div className="mt-4 text-sm text-slate-500 animate-fade-in">
          Encontrados {filteredPosts.length} resultados para "{query}"
        </div>
      )}

      {/* Si hay búsqueda, mostramos los resultados filtrados aquí mismo */}
      {query && (
        <div className="grid gap-4 mt-6">
          {filteredPosts.map(post => (
            <a 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="p-4 bg-white border border-slate-100 rounded-xl hover:bg-indigo-50 transition-colors flex justify-between items-center"
            >
              <div>
                <h4 className="font-bold text-slate-800">{post.title}</h4>
                <p className="text-xs text-slate-500">{post.description}</p>
              </div>
              <span className="text-indigo-400">→</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}