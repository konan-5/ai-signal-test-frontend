interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface Stat {
    value: string;
    label: string;
}

interface DashboardData {
    features: Feature[];
    stats: Stat[];
}

export type { Feature, Stat, DashboardData };