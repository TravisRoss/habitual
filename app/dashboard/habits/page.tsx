import { getTranslations } from "next-intl/server";
import { HabitsPage } from "./HabitsPage";

export default async function Page() {
  const [t, tCommon] = await Promise.all([
    getTranslations("habits"),
    getTranslations("common"),
  ]);

  return <HabitsPage title={t("title")} back={tCommon("backToDashboard")} />;
}
