import { motion } from "motion/react";
import { FooterContacts } from "./FooterContacts";
import { FOOTER_PLACES } from "../../data/data";
import { NameVictor } from "../auxiliary/NameVictor";


export const Footer = () => {
  return (
    <motion.footer
      id="contacts"
      className="px-[5%] py-[3%] flex flex-col gap-10 bg-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <NameVictor/>
          <p className="text-footer leading-relaxed">
            Ваша диета пришла сюда, чтобы красиво погибнуть, и мы с радостью станем её палачами.
            В битве между вашим прессом и нашей пастой Victor всегда выходит победителем.
            Не переживайте: калории, съеденные в ресторане в честь победы,
            официально считаются военным трофеем и не откладываются в боках.
            Victor — единственное место, где «объелся» звучит как почетный титул триумфатора.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <address className="flex flex-col lg:col-span-2 gap-4 not-italic">
            <h3 className="text-footer text-black uppercase">Наши адреса</h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_PLACES.map((section) => (
                <FooterContacts
                  key={section.name}
                  name={section.name}
                  addres={section.addres}
                />
              ))}
            </ul>
          </address>
        </div>
      </div>
    </motion.footer>
  );
};
