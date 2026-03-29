import client from "@/sanity/client";
import { faqQuery } from "@/sanity/queries";
import FAQs from "./FAQs";

export default async function FAQSection() {
  const faqs = await client.fetch(faqQuery);
    
  console.log('Fetched FAQs:', faqs); // Add this line
  console.log('Number of FAQs:', faqs.length); // Add this line

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      {/* <FAQs faqs={faqs} /> */}
      <FAQs  />
    </div>
  );
}