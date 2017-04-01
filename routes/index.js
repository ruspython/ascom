var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var cookieParser = require('cookie-parser');

var i18next = require('i18next');
var i18nMiddleware = require('i18next-express-middleware');
var COOKIE_NAME = 'locale';

i18next
    .use(i18nMiddleware.LanguageDetector)
    .init({
        lng: 'en',
        resources: {
            en: {
                translation: {
                    'services': 'services',
                    'skills': 'skills',
                    'portfolio': 'portfolio',
                    'team': 'team',
                    'upwork': 'upwork',
                    'contact': 'contacts',
                    'Name': 'Name',
                    'E-mail': 'E-mail',
                    'Message': 'Message',
                    'get in touch': 'get in touch',
                    'have any questions': 'have any questions',
                    'Leave your message and our manager will answer you': 'Leave your message and our manager will answer you',
                    'send request': 'send request',
                    'our team': 'our team',
                    'our hourly rate': 'our hourly rate',
                    'we are on': 'we are on',
                    'visible only for logged users': 'visible only for logged users',
                    'happy clients': 'happy clients',
                    'projects': 'projects',
                    'years': 'years',
                    'award won': 'award won',
                    'location': 'Russia, Saint-Petersburg',
                    'Name must contain at least 2 characters': 'Name must contain at least 2 characters',
                    'Not valid email address': 'Not valid email address',
                    'Message must contain at least 8 characters': 'Message must contain at least 8 characters',
                    'Message was successfully sent': 'Message was successfully sent',
                    'Some problems with your request. Check your name, email and message for non-standard characters.': 'Some problems with your request. Check your name, email and message for non-standard characters.'

                }
            },
            ru: {
                translation: {
                    'services': 'Услуги',
                    'skills': 'навыки',
                    'portfolio': 'портфолио',
                    'team': 'команда',
                    'upwork': 'upwork',
                    'contact': 'контакты',
                    'Name': 'Имя',
                    'E-mail': 'Имя почтового ящика',
                    'Message': 'Сообщение',
                    'get in touch': 'связаться',
                    'have any questions': 'есть вопросы',
                    'Leave your message and our manager will answer you': 'Оставьте свое сообщение и наш менеджер свяжется с Вами',
                    'send request': 'Отправить',
                    'our team': 'наша команда',
                    'our hourly rate': 'наша часовая ставка',
                    'we are on': 'мы на',
                    'visible only for logged users': 'доступно только для зарегистрированных пользователей',
                    'happy clients': 'счастливых клиентов',
                    'projects': 'проекта',
                    'years': 'года работы',
                    'award won': 'премия',
                    'location': 'Россия, Санкт-Петербург',
                    'Name must contain at least 2 characters': 'Имя должно включать минимум 2 символа',
                    'Not valid email address': 'Неверное имя почтового ящика',
                    'Message must contain at least 8 characters': 'Сообщение должно состоять минимум из 8 символов',
                    'Message was successfully sent': 'Сообщение успешно отправлено',
                    'Some problems with your request. Check your name, email and message for non-standard characters.': 'Убедитесь, что правильно введены данные.'
                }
            }
        }
    });

keystone.pre('routes', i18nMiddleware.handle(i18next, {
    ignoreRoutes: ['/foo'],
    removeLngFromUrl: false
}));


// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

keystone.pre('routes', cookieParser());
keystone.pre('routes', function (req, res, next) {
    res.cookie(COOKIE_NAME, process.env.LOCALE);
    next();
});

// Import Route Controllers
var routes = {
    views: importRoutes('./views'),
    emails: importRoutes('./emails')
};

// Setup Route Bindings
exports = module.exports = function (app) {
    app.all('/', routes.views.index);
    app.post('/message', routes.emails.message);


};
