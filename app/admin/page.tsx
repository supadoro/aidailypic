import { AdminArticleManager } from "@/src/components/admin-article-manager";
import { MainLayout } from "@/src/components/main-layout";
import { AdminEditorialSettings } from "@/src/components/admin-editorial-settings";

export default function AdminPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <AdminEditorialSettings />
        <AdminArticleManager />
      </div>
    </MainLayout>
  );
}
