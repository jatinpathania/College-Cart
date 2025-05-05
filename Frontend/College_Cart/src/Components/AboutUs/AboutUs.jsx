import React, { useContext,useEffect } from "react";
import collegeCartInterface from '../../assets/collegeCartInterface.png';
import styles from "./aboutus.module.css";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../Header/context';

const AboutUs = () => {
    const navigate = useNavigate()
    const {data } = useContext(UserDataContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const checkLogin=()=>{
    if(data){
      navigate("/")
    }else{
      navigate("/login")
    }
  }


  return (
    <div className={styles.pageWrapper}>
      <Header Header showSearch={false} showMiddleHeader={true} isProductsPage={false}/>
      
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Our Mission</h1>
            <p className={styles.missionStatement}>
              Empowering students through a smarter, safer campus marketplace that saves money and builds community.
            </p>
          </div>
          <img src="https://images.pexels.com/photos/5428770/pexels-photo-5428770.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Students using College Cart" className={styles.heroImage} />
        </div>

        <div className={styles.content}>
          <section className={styles.problemSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>The Problem We're Solving</h2>
              <div className={styles.divider}></div>
            </div>
            
            <div className={styles.sectionContent}>
              <p className={styles.text}>
                College students face significant financial and logistical challenges when acquiring essential items for their academic and personal lives:
              </p>
              
              <div className={styles.problemGrid}>
                <div className={styles.problemCard}>
                  <h3 className={styles.problemTitle}>Textbook Troubles</h3>
                  <p className={styles.problemDescription}>
                    Students spend an average of Rs.10000 annually on textbooks, often forced to buy new when used copies aren't available locally.
                  </p>
                </div>
                
                <div className={styles.problemCard}>
                  <h3 className={styles.problemTitle}>Essential Expenses</h3>
                  <p className={styles.problemDescription}>
                    Basic necessities like electronics become financial burdens when purchased new each semester.
                  </p>
                </div>
                
                <div className={styles.problemCard}>
                  <h3 className={styles.problemTitle}>Wasteful Cycles</h3>
                  <p className={styles.problemDescription}>
                    Perfectly good items get discarded at semester's end when students can't find buyers, creating unnecessary waste.
                  </p>
                </div>
                
                <div className={styles.problemCard}>
                  <h3 className={styles.problemTitle}>Safety Concerns</h3>
                  <p className={styles.problemDescription}>
                    General marketplaces expose students to risks when meeting strangers, with no campus-specific verification.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.solutionSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Our Innovative Solution</h2>
              <div className={styles.divider}></div>
            </div>
            
            <div className={styles.solutionContent}>
              <div className={styles.solutionText}>
                <p className={styles.text}>
                  College Cart revolutionizes campus commerce with a platform designed exclusively for student needs:
                </p>
                
                <div className={styles.solutionHighlights}>
                  <div className={styles.highlightItem}>
                    <h3 className={styles.highlightTitle}>Campus-Exclusive Marketplace</h3>
                    <p>
                      Verified <strong>chitkarauniversity.edu</strong> email registration ensures all users are actual students at your institution, creating a trusted network.
                    </p>
                  </div>
                  
                  <div className={styles.highlightItem}>
                    <h3 className={styles.highlightTitle}>Academic & Lifestyle Categories</h3>
                    <p>
                      Specialized sections for textbooks, dorm essentials, electronics, and more - all organized for student needs.
                    </p>
                  </div>
                  
                  <div className={styles.highlightItem}>
                    <h3 className={styles.highlightTitle}>Smart Pricing Tools</h3>
                    <p>
                      Automated price suggestions based on condition and demand help students get fair value for their items.
                    </p>
                  </div>
                  
                  <div className={styles.highlightItem}>
                    <h3 className={styles.highlightTitle}>Sustainable Savings</h3>
                    <p>
                      Our platform keeps money circulating within the student community while reducing campus waste.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={styles.solutionImage}>
                <img src={collegeCartInterface} alt="College Cart platform interface" className={styles.featureImage} />
              </div>
            </div>
          </section>

          <section className={styles.featuresSection}>
  <div className={styles.sectionHeader}>
    <h2 className={styles.sectionTitle}>Key Features & Benefits</h2>
    <div className={styles.divider}></div>
  </div>
  
  <div className={styles.featuresGrid}>
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <img src="https://cdn-icons-png.flaticon.com/512/1570/1570887.png" alt="Verification icon" />
      </div>
      <h3 className={styles.featureTitle}>Student Verification</h3>
      <p className={styles.featureDescription}>
        Secure <strong>chitkarauniversity.edu</strong> email authentication ensures all users are verified campus community members.
      </p>
    </div>
    
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <img src="https://cdn-icons-png.flaticon.com/512/3917/3917132.png" alt="Search icon" />
      </div>
      <h3 className={styles.featureTitle}>Smart Search</h3>
      <p className={styles.featureDescription}>
        Find exactly what you need with filters for categories, price range, and location.
      </p>
    </div>
    
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <img src="https://cdn-icons-png.flaticon.com/512/4401/4401647.png" alt="Chat icon" />
      </div>
      <h3 className={styles.featureTitle}>Secure Messaging</h3>
      <p className={styles.featureDescription}>
        Built-in chat with meeting spot suggestions for safe, convenient transactions.
      </p>
    </div>
    
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <img src="https://cdn-icons-png.flaticon.com/512/3344/3344372.png" alt="Variety icon" />
      </div>
      <h3 className={styles.featureTitle}>Comprehensive Marketplace</h3>
      <p className={styles.featureDescription}>
        Our platform enables students to buy and sell textbooks, electronics, furniture, stationery, and other campus essentials.
      </p>
    </div>
    
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <img src="https://cdn-icons-png.flaticon.com/512/2745/2745886.png" alt="Categories icon" />
      </div>
      <h3 className={styles.featureTitle}>Diverse Categories</h3>
      <p className={styles.featureDescription}>
        Students can trade academic materials, dorm furnishings, appliances, clothing, and daily necessities - all in one place.
      </p>
    </div>
    
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <img src="https://png.pngtree.com/png-vector/20241227/ourlarge/pngtree-eco-leaf-icon-representing-sustainability-and-environmental-awareness-png-image_14888668.png" alt="Eco icon" />
        </div>
            <h3 className={styles.featureTitle}>Green Impact</h3>
            <p className={styles.featureDescription}>
            Track your personal sustainability impact through items reused vs. discarded.
        </p>
        </div>
    </div>
    </section>

          <section className={styles.impactSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Our Campus Impact</h2>
              <div className={styles.divider}></div>
            </div>
            
            <div className={styles.impactContent}>
              <div className={styles.impactStats}>
                <div className={styles.statItem}>
                  <h3 className={styles.statNumber}>70%</h3>
                  <p className={styles.statLabel}>Average savings on textbooks</p>
                </div>
                
                <div className={styles.statItem}>
                  <h3 className={styles.statNumber}>85%</h3>
                  <p className={styles.statLabel}>Reduction in move-out waste</p>
                </div>
                
                <div className={styles.statItem}>
                  <h3 className={styles.statNumber}>92%</h3>
                  <p className={styles.statLabel}>Users who feel safer than general marketplaces</p>
                </div>
              </div>
              
              <div className={styles.impactTestimonials}>
                <div className={styles.testimonialCard}>
                  <p className={styles.testimonialText}>
                    "I saved over Rs.1500 my first semester using College Cart for textbooks and a mini-fridge. The meet-up spots on campus made me feel completely safe."
                  </p>
                  <p className={styles.testimonialAuthor}>- Pranav Jaswal, CSE Student</p>
                </div>
                
                <div className={styles.testimonialCard}>
                  <p className={styles.testimonialText}>
                    "As a student from eastern India, this platform helped me furnish my dorm affordably and make local friends through transactions."
                  </p>
                  <p className={styles.testimonialAuthor}>- Kritika Sharma, BCA Student</p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.futureSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Future Vision</h2>
              <div className={styles.divider}></div>
            </div>
            
            <div className={styles.futureContent}>
              <p className={styles.text}>
                We're continuously evolving to better serve the student community with upcoming features:
              </p>
              
              <ul className={styles.roadmapList}>
                <li className={styles.roadmapItem}>
                  <strong>Course-Matched Textbook Exchange:</strong> Automatic pairing of buyers and sellers in the same classes
                </li>
                <li className={styles.roadmapItem}>
                  <strong>Campus Delivery Network:</strong> Verified student couriers for contactless item transfers
                </li>
                <li className={styles.roadmapItem}>
                  <strong>Department-Specific Hubs:</strong> Specialized marketplaces for engineering equipment, art supplies, and lab gear
                </li>
                <li className={styles.roadmapItem}>
                  <strong>Skill Barter System:</strong> Exchange items for tutoring, editing, or other student services
                </li>
              </ul>
              
              <div className={styles.ctaBox}>
                <h3 className={styles.ctaTitle}>Join the Campus Commerce Revolution</h3>
                <p className={styles.ctaText}>
                  Be part of a movement that's making college more affordable, sustainable, and connected.
                </p>
                <button className={styles.ctaButton} onClick={()=>checkLogin()}>
                Get Started Today</button>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUs;