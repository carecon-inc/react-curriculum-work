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
    // 0 未満の商品がないか確認
    for (const order of orders) {
        if (order.price < 0) {
        //0未満の場合エラーメッセージ表示
        throw new Error("不正な価格が含まれています");
        }
    }
    //在庫（quantity）が 1 以上の商品だけを抽出した新しい配列
    const validOrders = orders.filter((order) => order.quantity >= 1);
    //税込金額の計算
    for (const order of validOrders) {
      const taxIncluded = order.price * order.quantity * (1 + TAX_RATE);
      //税込金額の表示
        console.log(
        `商品名: ${
            order.name
        }, 合計金額(税込): ${taxIncluded.toLocaleString()}円`
        );
    }
    } catch (error) {
    // エラーが発生した場合に内容を表示する
    console.error("処理を中断しました:", error.message);
    } finally {
    //完了メッセージ
    console.log("すべての処理が完了しました");
    }
};

// 処理の実行
processOrders();
