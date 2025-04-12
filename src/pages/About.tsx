import { motion } from 'framer-motion';
import { Award, Code, Database, Globe } from 'lucide-react';

const About = () => {
  const skills = [
    {
      category: 'Frontend',
      icon: <Code className="h-6 w-6 text-indigo-600" />,
      items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    },
    {
      category: 'Backend',
      icon: <Database className="h-6 w-6 text-indigo-600" />,
      items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
    },
    {
      category: 'Other',
      icon: <Globe className="h-6 w-6 text-indigo-600" />,
      items: ['Git', 'Docker', 'AWS', 'CI/CD'],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">About Me</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Background</h2>
        <p className="text-gray-600 mb-4">
          With over 5 years of experience in web development, I've worked on a wide
          range of projects from small business websites to large-scale enterprise
          applications. My passion lies in creating efficient, scalable, and
          user-friendly solutions that make a real impact.
        </p>
        <p className="text-gray-600">
          I'm constantly learning and staying up-to-date with the latest
          technologies and best practices in the ever-evolving world of web
          development.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {skills.map((skillSet) => (
          <motion.div
            key={skillSet.category}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              {skillSet.icon}
              <h3 className="text-lg font-semibold text-gray-800 ml-2">
                {skillSet.category}
              </h3>
            </div>
            <ul className="space-y-2">
              {skillSet.items.map((item) => (
                <li key={item} className="text-gray-600">
                  • {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Award className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-800 ml-2">
            Professional Experience
          </h2>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Senior Full Stack Developer
            </h3>
            <p className="text-gray-600">Tech Corp • 2020 - Present</p>
            <p className="text-gray-600 mt-2">
              Led development of multiple high-impact projects, mentored junior
              developers, and implemented best practices that improved team
              productivity by 30%.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Full Stack Developer
            </h3>
            <p className="text-gray-600">Web Solutions Inc • 2018 - 2020</p>
            <p className="text-gray-600 mt-2">
              Developed and maintained various client projects, focusing on
              responsive design and performance optimization.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;