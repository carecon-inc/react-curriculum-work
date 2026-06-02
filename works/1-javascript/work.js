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

    // タスク1　priceが0未満の商品がないかをチェック
    const hasInvalidPrice = orders.some((order) => order.price < 0);
    if (hasInvalidPrice) {
      throw new Error("不正な価格が含まれています");
    }

    // タスク2　quantityが1以上の商品だけを抽出した新しい配列を作成
    const validOrders = orders.filter((order) => order.quantity >= 1);

    // タスク3　計算式と出力
    validOrders.forEach((order) => {
      const totalPriceWithTax = order.price * order.quantity * (1 + TAX_RATE);
      const formattedPrice = totalPriceWithTax.toLocaleString(); // カンマで区切り
      // バッククウォート（` `）を使用する、便利な文字列作成の方法
      console.log(`商品名: ${order.name}, 合計金額(税込): ${formattedPrice}円`);
    });
  } catch (error) {
    // エラーが発生した場合に内容を表示する
    console.error("処理を中断しました:", error.message);
  } finally {
    // タスク4　成功・失敗に関わらず、最後に必ず実行
    console.log("すべての処理が完了しました");
  }
};

// 処理の実行
processOrders();
