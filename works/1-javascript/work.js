// 販売にかかる消費税率（10%）
const TAX_RATE = 0.1;

// サーバーから届いた注文データのリスト
const orders = [
  { id: 1, name: "Laptop", price: 120000, quantity: 1 },
  { id: 2, name: "Mouse", price: 3000, quantity: 0 },
  { id: 3, name: "Monitor", price: -5000, quantity: 2 },
];

// 注文データを読み込んで処理するメイン関数
const processOrders = async () => {
  console.log("注文データをチェック中...");

  // データの受信待ちをシミュレート（2秒待機）
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 予期せぬエラーからプログラムを守るためのブロック
  try {
    // --- ここからワーク内容を記述 ---
    // タスク１
    if (orders.find((order) => order.price < 0)) {
      throw new Error("不正な価格が含まれています");
    }

    // タスク２
    const validOrders = orders.filter((order) => order.quantity >= 1);

    // タスク３
    // タスク３：各商品の合計金額（税込）を計算して出力
    validOrders.forEach((order) => {
      // (価格 × 数量) × (1 + 消費税率)
      const totalPrice = order.price * order.quantity * (1 + TAX_RATE);

      // カンマ区切りの文字列に変換し、テンプレートリテラルで出力
      console.log(
        `商品名: ${order.name}, 合計金額(税込): ${totalPrice.toLocaleString()}円`
      );
    });
  } catch (error) {
    // エラーが発生した場合に内容を表示する
    console.log("処理を中断しました:", error.message);
  } finally {
    // 成功・失敗に関わらず、最後に必ず実行される
    console.log("すべての処理が完了しました");
  }
};

// 処理の実行
processOrders();
