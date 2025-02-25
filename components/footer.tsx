"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import LIcons from "@/components/Icons";

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const socialLinks = [
  { name: "Twitter", icon: "Twitter", url: "#" },
  { name: "LinkedIn", icon: "Linkedin", url: "#" },
  { name: "Facebook", icon: "Facebook", url: "#" },
  { name: "Instagram", icon: "Instagram", url: "#" }
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" }
];

const services = [
  { name: "service1", href: "/service1" },
  { name: "service2", href: "/service2" },
  { name: "service3", href: "/service3" },

];

const contactInfo = {
  address: [
    "Location",
  ],
  gps: "GPS",
  phones: [
    "Telephone",
  ],
  emails: [
    "somebody@gmail.com",
  ]
};

export default function Footer() {
  return (
    <motion.footer 
      className="bg-background border-t"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LIcons icon="Boxes" className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">Company</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Info
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <LIcons icon={social.icon} className="w-4 h-4 text-primary" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-lg font-semibold mb-4">Quick Links</h6>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h6 className="text-lg font-semibold mb-4">Our Services</h6>
            <ul className="space-y-2">
              {services.map((service) => (
                <motion.li 
                  key={service.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h6 className="text-lg font-semibold">Contact Us</h6>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-muted-foreground">
                <LIcons icon="MapPin" className="w-4 h-4 text-primary mt-1" />
                <div className="text-sm space-y-1">
                  {contactInfo.address.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                  <p className="text-xs flex items-center gap-1">
                    <LIcons icon="MapPinned" className="w-3 h-3" />
                    {contactInfo.gps}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <LIcons icon="Phone" className="w-4 h-4 text-primary mt-1" />
                <div className="text-sm space-y-1">
                  {contactInfo.phones.map((phone, i) => (
                    <p key={i}>{phone}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <LIcons icon="Mail" className="w-4 h-4 text-primary mt-1" />
                <div className="text-sm space-y-1">
                  {contactInfo.emails.map((email, i) => (
                    <p key={i}>{email}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Company. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}