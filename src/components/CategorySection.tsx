import { type Category } from '@/data/tools';
import ToolCard from '@/components/ToolCard';

interface Props {
  category: Category;
  startIndex?: number;
}

export default function CategorySection({ category, startIndex = 0 }: Props) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <div className={`h-5 w-1 rounded-full ${category.bgBarClass}`} />
        <h2 className="text-base font-bold text-slate-700">
          {category.emoji} {category.name}
        </h2>
        <span className="text-xs text-slate-400 font-medium">
          ({category.tools.length})
        </span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {category.tools.map((tool, i) => (
          <ToolCard
            key={tool.href}
            href={tool.href}
            name={tool.name}
            description={tool.description}
            icon={tool.icon}
            colorClass={category.colorClass}
            iconBgClass={category.iconBgClass}
            isNew={tool.isNew}
            comingSoon={tool.comingSoon}
            index={startIndex + i}
          />
        ))}
      </div>
    </section>
  );
}
