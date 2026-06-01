import Address from "@/components/modules/cart/Address"
import CartProducts from "@/components/modules/cart/CartProduct"
import Coupon from "@/components/modules/cart/Coupon"
import PaymentDetails from "@/components/modules/cart/PaymentDetails"
import ProductBanner from "@/components/modules/products/banner"
import ResuableContainer from "@/components/ui/core/ResuableContainer"

const CartPage = () => {
    return (
        <ResuableContainer>
            <ProductBanner
                title="Cart"
                path="Home - Cart"
            />
            <div className="grid grid-cols-12 gap-8 my-5">
                <CartProducts />
                <Coupon />
                <Address />
                <PaymentDetails />
            </div>
        </ResuableContainer>
    )
}

export default CartPage