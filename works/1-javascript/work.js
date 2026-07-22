const TAX_RATE = 0.1;

const orders = [
    { id: 1, name: "Laptop", price: 120000, quantity: 1 },
    { id: 2, name: "Mouse", price: 3000, quantity: 0 },
    { id: 3, name: "Monitor", price: -5000, quantity: 2 },
];

const processOrders = async () => {
    console.log("注文データをチェック中...");
    await new Promise((resolve) => setTimeout(resolve, 2000));


    try {
    for (const order of orders) {
        if (order.price < 0) {
        throw new Error("不正な価格が含まれています");
        }
    }

    const validOrders = orders.filter((order) => order.quantity >= 1);

    validOrders.forEach((order) => {
      const totalWithoutTax = order.price * order.quantity;
      const totalWithTax = Math.floor(totalWithoutTax * (1 + TAX_RATE));
        const formattedPrice = totalWithTax.toLocaleString();
        console.log(`商品名: ${order.name}, 合計金額(税込): ${formattedPrice}円`);
    });

    } catch (error) {
    console.error("処理を中断しました:", error.message);
    } finally {
    console.log("すべての処理が完了しました");
    }
};

processOrders();
