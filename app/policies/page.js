export const metadata = {
  title: 'Our Policies - Aoun Store',
  description: 'Read our Terms of Service, Privacy, Shipping, and Return Policies.',
};

export default function PoliciesPage() {
    return (
        <div className="container" style={{paddingTop: '40px', paddingBottom: '40px'}}>
            <h2 className="section-title visible">Terms and Policies</h2>
            <div className="policy-container">
                <h3>Terms of Service</h3>
                <p>Welcome to Aoun Store, operated by Aoun Abbas. By accessing or using our website and purchasing our products, you agree to be bound by these terms. Please read them carefully. The content of this website is for your general information and use only and is subject to change without notice.</p>
                
                <h3>Privacy Policy</h3>
                <p>Your privacy is important to us. We collect personal information such as your name, contact number, and address solely for the purpose of fulfilling your order. We are committed to ensuring that your information is secure and is not shared with any third parties.</p>
                
                <h3>Shipping Policy</h3>
                <p>We proudly offer Cash on Delivery (COD) all over Pakistan. After an order is placed, it is processed and dispatched within 1-2 business days. You can expect your product to be delivered to your doorstep within 3 to 7 working days, depending on your location.</p>

                <h3>Return &amp; Refund Policy</h3>
                <p>At Aoun Store, customer satisfaction is our priority. We offer a 7-day check and return warranty. If you are not satisfied with your purchase, you may return it within 7 days of receiving it for an exchange or a full refund. To be eligible for a return, the product must be unused, in its original packaging, and with all tags attached. Please contact our customer service to initiate a return.</p>
            </div>
        </div>
    );
}