import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FileText, Calendar } from 'lucide-react';

export default function MatchNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/news')
      .then(res => {
        setNews(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6 text-sofa-dark-textMuted text-xs">
        Haberler yükleniyor...
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-8 text-sofa-dark-textMuted text-xs italic bg-sofa-dark-bg/20 rounded-xl select-none">
        Bu maç ile ilgili güncel haber bulunmamaktadır.
      </div>
    );
  }

  return (
    <div className="space-y-3 p-1 select-none">
      {news.map((item) => (
        <a 
          key={item.id}
          href={`#news-${item.id}`}
          className="flex items-center space-x-3 p-3 bg-sofa-dark-surface/50 border border-sofa-dark-border/40 hover:bg-sofa-dark-surfaceHover rounded-xl transition block"
        >
          {/* Mock news icon indicator (since thumbnails are mock urls) */}
          <div className="w-14 h-14 rounded-lg bg-sofa-blue/10 border border-sofa-blue/20 flex items-center justify-center text-sofa-blue flex-shrink-0 shadow-inner">
            <FileText size={24} />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-xs leading-snug truncate-2-lines text-sofa-dark-text hover:text-sofa-blue transition">
              {item.title}
            </h4>
            <div className="flex items-center space-x-2 text-[10px] text-sofa-dark-textMuted mt-1">
              <span className="font-semibold text-sofa-blue bg-sofa-blue/10 px-1.5 py-0.2 rounded">
                {item.source}
              </span>
              <span className="flex items-center space-x-1">
                <Calendar size={10} />
                <span>{item.date}</span>
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
