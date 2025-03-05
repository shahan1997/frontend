import React from "react";
import { motion } from "framer-motion";
import "./delivery.css";
import cook1 from "../../../assets/images/t1.jpg";
import cook2 from "../../../assets/images/t2.jpg";
import cook3 from "../../../assets/images/t3.jpg";
import TeamCard from "./teamCard";

const Team = () => {
  return (
    <div className="team-container">
      <h1 className="team-heading">
        MEET Our expert <span className="highlight">Chefs</span>
      </h1>
      <div className="team-grid">
        {/* Team Cards with Scroll-triggered Animations */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <TeamCard
            image={cook1}
            name="Ravi Raj"
            position="Kitchen Porter"
            description=" Efficient, hardworking support staff ensuring kitchen cleanliness, hygiene, and smooth operations."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <TeamCard
            image={cook2}
            name="Karan Priya"
            position="Executive Chef"
            description="Highly skilled, certified expert in gourmet cuisine, menu planning, and kitchen leadership."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring", delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <TeamCard
            image={cook3}
            name="Vinay Maha"
            position="Head Chef"
            description="Certified professional excelling in dish innovation, team management, and culinary expertise."
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
