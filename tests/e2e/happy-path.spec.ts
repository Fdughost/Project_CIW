import { expect, test, type Page } from "@playwright/test";

const clickRepeatedly = async (page: Page, name: string, count: number) => {
  for (let index = 0; index < count; index += 1) {
    await page.getByRole("button", { name }).click();
  }
};

const waitForWorkbench = async (page: Page, label: string) => {
  await expect(page.getByText(label, { exact: false }).first()).toBeVisible();
};

test("player can finish the whole adventure", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();

  await page.getByRole("button", { name: "开始冒险" }).click();
  await waitForWorkbench(page, "Harmonica Lock");

  await clickRepeatedly(page, "第 1 位加一", 7);
  await clickRepeatedly(page, "第 2 位加一", 5);
  await clickRepeatedly(page, "第 3 位加一", 6);
  await clickRepeatedly(page, "第 4 位加一", 4);
  await page.getByRole("button", { name: "转动门锁" }).click();
  await waitForWorkbench(page, "Guard Logic Desk");

  await page.getByRole("button", { name: "选择守卫 G" }).click();
  await page.getByRole("button", { name: "把骑士徽章交给 G" }).click();
  await waitForWorkbench(page, "Build Pipeline");

  await page.getByRole("button", { name: "需求 上移" }).click();
  await page.getByRole("button", { name: "设计 上移" }).click();
  await page.getByRole("button", { name: "设计 上移" }).click();
  await page.getByRole("button", { name: "测试 上移" }).click();

  const ownerSelects = page.locator(".ciw-task-card select");
  await ownerSelects.nth(0).selectOption("产品");
  await ownerSelects.nth(1).selectOption("架构");
  await ownerSelects.nth(2).selectOption("码农");
  await ownerSelects.nth(3).selectOption("测试");
  await ownerSelects.nth(4).selectOption("主管");
  await page.getByRole("button", { name: "运行流程" }).click();
  await waitForWorkbench(page, "Nokia Console");

  for (const key of ["5 JKL", "6 MNO", "8 TUV", "3 DEF", "#"]) {
    await page.getByRole("button", { name: key }).click();
  }
  await waitForWorkbench(page, "Trace Map");

  for (const choice of ["右侧草坡", "沿溪流走", "正前矮桥", "篱笆缺口", "月光小路"]) {
    await page.getByRole("button", { name: choice }).click();
  }
  await waitForWorkbench(page, "Pendant Bench");

  await page.getByRole("button", { name: "放入左槽" }).click();
  await page.getByRole("button", { name: "放入右槽" }).click();
  await page.getByRole("button", { name: "旋转左瓣" }).click();
  await page.getByRole("button", { name: "旋转右瓣" }).click();
  await page.getByRole("button", { name: "翻转右瓣" }).click();
  await page.getByRole("button", { name: "合上挂饰" }).click();
  await waitForWorkbench(page, "Archive Cabinet");

  await page.getByRole("button", { name: "8", exact: true }).click();
  await page.getByPlaceholder("__").fill("所有");
  await page.getByRole("button", { name: "补全借阅卡" }).click();
  await waitForWorkbench(page, "Moonlight Card");

  const textInputs = page.locator('input:not([type="range"])');
  await textInputs.nth(0).fill("光是你");
  await textInputs.nth(1).fill("也是你");
  await page.getByRole("button", { name: "交还卡片" }).click();

  await expect(page.getByRole("heading", { name: "恭喜你！" })).toBeVisible();
  await expect(page.getByText("爱马仕Lindy26兑换券")).toBeVisible();
});
