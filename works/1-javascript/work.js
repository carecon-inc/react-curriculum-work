// 販売にかかる消費税率（10%）
const TAX_RATE = 0.1;

// サーバーから届いた注文データのリスト
const orders = [
  { id: 1, name: "Laptop", price: 120000, quantity: 1 },
  { id: 2, name: "Mouse", price: 3000, quantity: 0 },
  { id: 3, name: "Monitor", price: -5000, quantity: 2 },
];

// 金額計算用の関数
const caluculateItems = (items) => {
  items.forEach((item) => {
    const totalPrice = item.price * item.quantity * (1 + TAX_RATE);
    const normalizationPrice = totalPrice.toLocaleString();
    const product = `商品名: ${item.name}, 合計金額(税込): ${normalizationPrice}円`;
    console.log(product);
  });
};

// 注文データを読み込んで処理するメイン関数
const processOrders = async () => {
  console.log("注文データをチェック中...");

  // データの受信待ちをシミュレート（2秒待機）
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 予期せぬエラーからプログラムを守るためのブロック
  try {
    // --- ここからワーク内容を記述 ---

    // 金額を取得
    const prices = orders.map((order) => order.price);

    // 在庫が1以上の商品だけを抽出
    const validOrders = orders.filter((order) => order.quantity >= 1);
    caluculateItems(validOrders);

    // 金額に0円未満が含まれる場合はエラーを投げる。
    prices.forEach((price) => {
      if (price < 0) {
        throw new Error("不正な価格が含まれています");
      }
    });
  } catch (error) {
    // エラーが発生した場合に内容を表示する
    console.error("処理を中断しました:", error.message);
  } finally {
    console.log("すべての処理が完了しました");
  }
};

// 処理の実行
processOrders();
