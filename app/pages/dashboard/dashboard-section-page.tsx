import { DashboardSidebar } from "./dashboard-sidebar";

type DashboardSectionPageProps = {
  group: string;
  title: string;
};

export function DashboardSectionPage({ group, title }: DashboardSectionPageProps) {
  return (
    <main className="min-h-screen bg-[#eef4ff] px-3 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto flex w-full max-w-[1440px] gap-4">
        <DashboardSidebar />

        <section className="min-w-0 flex-1">
          <div className="min-h-[calc(100vh-2rem)] rounded-3xl border border-[#d8e2f2] bg-white p-6 shadow-[0_14px_36px_rgba(62,92,144,0.07)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#7c3aed]">
              {group}
            </p>
            <h1 className="mt-2 font-[var(--font-sora)] text-3xl font-semibold tracking-[-0.04em] text-[#101a34] sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#697894]">
              Manage and review {title.toLowerCase()} from this section.
            </p>

            <div className="mt-8 rounded-2xl border border-dashed border-[#cfdaf0] bg-[#f8fbff] p-8 text-center">
              <p className="text-lg font-semibold text-[#1b2c4d]">{title}</p>
              <p className="mt-2 text-sm text-[#697894]">
                This page is ready for its {title.toLowerCase()} workflow and data.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
