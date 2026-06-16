// 販売にかかる消費税率（10%）
const TAX_RATE = 0.1;


// サーバーから届いた注文データのリスト
const orders = [
    { id: 1, name: "Laptop", price: 120000, quantity: 1 },
    { id: 2, name: "Mouse", price: 3000, quantity: 0 },
    { id: 3, name: "Monitor", price: -5000, quantity: 2 },
];

const checkDataIntegrity = (ordersData) => {
            for (const item of ordersData) {
                if (item.price < 0) {
                    throw new Error("不正な価格が含まれています");
                }
            }
            console.log("データの整合性チェック：OK");
        }

// 注文データを読み込んで処理するメイン関数
const processOrders = async () => {
    console.log("注文データをチェック中...");


    // データの受信待ちをシミュレート（2秒待機）
    await new Promise((resolve) => setTimeout(resolve, 2000));


    // 予期せぬエラーからプログラムを守るためのブロック
    try {
        // --- ここからワーク内容を記述 ---
        // 【タスク1】
        checkDataIntegrity(orders);

        // 【タスク2】
        const validOrders = filterValidOrders(orders);

        // 【タスク3】
        const calculateTaxIncludedPrice = (item) => {
            const subtotal = item.price * item.quantity;
            const taxIncluded = Math.round(subtotal + (subtotal * TAX_RATE));
            return taxIncluded;
        }
        // ループして画面に出力
        validOrders.forEach(item => {
            const totalPrice = calculateTaxIncludedPrice(item);
            const formattedPrice = totalPrice.toLocaleString('ja-JP');
            console.log(`${item.name} の税込合計金額: ${formattedPrice}円`);
        });
    } catch (error) {
        // エラーが発生した場合に内容を表示する
        console.error("処理を中断しました:", error.message);
    } finally {
        //タスク４
        console.log("すべての処理が完了しました")
    }
};


// 処理の実行
processOrders();
