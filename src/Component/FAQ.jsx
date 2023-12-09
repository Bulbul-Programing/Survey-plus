import React from 'react';

const FAQ = () => {
    return (
        <div className='my-16'>
            <div className='text-center mx-5'>
                <h1 className='text-2xl md:text-3xl lg:text-3xl font-bold'>Frequently Asked Questions.</h1>
                <p className='text-sm md:text-base lg:text-base font-bold my-3'>Navigate through our comprehensive FAQ section to find quick answers to common questions about Survey Plus.</p>
            </div>
            <div className='flex flex-col md:flex-col lg:flex-row gap-x-2 items-center mx-10 lg:mx-20 my-10'>
                <div className='lg:w-1/2'>
                    <img src="https://i.ibb.co/0mn6qHN/tiny-people-sitting-standing-near-giant-faq-74855-7879.jpg" alt="" />
                </div>
                <div className='lg:w-1/2'>
                    <div className="collapse mb-3 collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">
                            Q: How can I sign up for Survey Plus?
                        </div>
                        <div className="collapse-content">
                            <p>ANS: Signing up for Survey Plus is quick and easy! Click on the "Sign Up" button on our homepage, fill in the required information, and you're ready to explore and participate in surveys.</p>
                        </div>
                    </div>
                    <div className="collapse mb-3 collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">
                            Q: Are there any fees for joining Survey Plus?
                        </div>
                        <div className="collapse-content">
                            <p>ANS: No, Survey Plus is completely free to join. We believe in making insights accessible to everyone, and your participation won't cost you a thing.</p>
                        </div>
                    </div>
                    <div className="collapse mb-3 collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">
                            Q: How do I participate in surveys?
                        </div>
                        <div className="collapse-content">
                            <p>ANS: Once you've signed up, log in to your account, browse through the available surveys, and choose the ones that interest you. Follow the instructions, share your opinions, and contribute to meaningful discussions.</p>
                        </div>
                    </div>
                    <div className="collapse mb-3 collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">
                            Q: What types of surveys are available on Survey Plus?
                        </div>
                        <div className="collapse-content">
                            <p>A: We offer a diverse range of surveys across categories such as technology, health, entertainment, business, and more. You'll find surveys that cater to various interests and perspectives.</p>
                        </div>
                    </div>
                    <div className="collapse mb-3 collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">
                            Q: How are survey responses used?
                        </div>
                        <div className="collapse-content">
                            <p>A: Survey responses are anonymized and aggregated to generate insights. These insights may be shared with the community or used to inform organizations and researchers. Your privacy and data security are our top priorities.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;