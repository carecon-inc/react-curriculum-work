import fs from "fs";

/**
 * サーバー側でのみ使用できるユーティリティ関数。
 */
export function getServerInfo() {
    const packageJson = JSON.parse(
        fs.readFileSync("package.json", "utf-8"),
    ) as {
        name: string;
        version: string;
    };
    return {
        appName: packageJson.name,
        version: packageJson.version,
    };
}
