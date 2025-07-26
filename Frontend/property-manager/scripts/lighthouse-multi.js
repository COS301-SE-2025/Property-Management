const { execSync } = require('child_process');

const routes = [
  { path: '/', report: 'lighthouse-login.html' },
  { path: '/register-owner', report: 'lighthouse-register_owner.html' },
  { path: '/home', report: 'lighthouse-home.html' },
  { path: '/create-property', report: 'lighthouse-create_property.html' },
  { path: '/create-property', report: 'lighthouse-create_property.html' },
  { path: '/contractorRegister', report: 'lighthouse-contractor_register.html' },
];

const url = 'http://localhost:4200';

routes.forEach(route => {
  console.log(`Auditing ${route.path}...`);
  execSync(`npx lighthouse ${url}${route.path} --output html --output-path ./${route.report} --quiet`, { stdio: 'inherit' });
});
