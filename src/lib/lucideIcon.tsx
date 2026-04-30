import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Coffee,
  Compass,
  Heart,
  Info,
  Map,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
  Utensils,
  type LucideIcon as LucideIconType,
} from 'lucide-react';

const ICONS: Record<string, LucideIconType> = {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Coffee,
  Compass,
  Heart,
  Info,
  Map,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
  Utensils,
};

export function LucideIcon({
  name,
  className,
  fallback = 'Sparkles',
}: {
  name?: string;
  className?: string;
  fallback?: string;
}) {
  const Icon = (name && ICONS[name]) || ICONS[fallback] || Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
