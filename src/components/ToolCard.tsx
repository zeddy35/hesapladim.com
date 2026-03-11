import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';

interface Props {
  href: string;
  name: string;
  description: string;
  icon: LucideIcon;
  colorClass: string;
  iconBgClass: string;
  isNew?: boolean;
  comingSoon?: boolean;
  index?: number;
}

const baseClass =
  'group flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 transition-all duration-150';

export default function ToolCard({
  href,
  name,
  description,
  icon: Icon,
  colorClass,
  iconBgClass,
  isNew,
  comingSoon,
  index = 0,
}: Props) {
  const content = (
    <>
      <span
        className={`shrink-0 p-2.5 rounded-xl ${iconBgClass} group-hover:scale-105 transition-transform duration-150`}
      >
        <Icon size={18} className={colorClass} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-sm text-slate-800 leading-tight">{name}</h3>
          {isNew && (
            <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full shrink-0">
              YENİ
            </span>
          )}
          {comingSoon && (
            <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full shrink-0">
              YAKINDA
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{description}</p>
      </div>
      {!comingSoon && (
        <ArrowRight
          size={14}
          className="text-slate-300 group-hover:text-blue-500 shrink-0 mt-0.5 transition-colors duration-150"
        />
      )}
    </>
  );

  if (comingSoon) {
    return (
      <div
        className={`${baseClass} opacity-60 cursor-not-allowed`}
        style={{ animationDelay: `${index * 30}ms` }}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseClass} hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5`}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {content}
    </Link>
  );
}
