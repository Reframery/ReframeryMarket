import WellcomePage from '../pages/WellcomePage.js';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import WellcomeComponent from '../components/WellcomeComponent';
import Footer from '../components/Footer';

describe('WellcomePage UI test', () => {

    describe('shallow tests', () => {
        let shallowWrapper;

        beforeEach(() => {
            shallowWrapper = shallow(<WellcomePage />);
        });


        it('should have a Wellcome Component', () => {
            const wellcomeComponent = shallowWrapper.find(WellcomeComponent);
            expect(wellcomeComponent.length).toBe(1);
        });

        it('should have four communities', () => {
            expect(shallowWrapper.contains('Canada')).toBe(true);
            expect(shallowWrapper.contains('USA')).toBe(true);
            expect(shallowWrapper.contains('Brazil')).toBe(true);
            expect(shallowWrapper.contains('Mexico')).toBe(true);
        });

        it('should navigate to Canada home page when clicked the string of Canada', () => {
            const linktoHome = shallowWrapper.find('Link.canada');
            expect(linktoHome.text().includes('Canada')).toBe(true);
            expect(linktoHome.at(0).props().to).toBe('/canada/products');
        });

        it('should navigate to usa home page when clicked the string of USA', () => {
            const linktoHome = shallowWrapper.find('Link.usa');
            expect(linktoHome.text().includes('U.S.A')).toBe(true);
            expect(linktoHome.at(0).props().to).toBe('/usa/products');
        });


        it('should navigate to brazil home page when clicked the string of Brazil', () => {
            const linktoHome = shallowWrapper.find('Link.brazil');
            expect(linktoHome.text().includes('Brazil')).toBe(true);
            expect(linktoHome.at(0).props().to).toBe('/brazil/products');
        });

        it('should navigate to mexico home page when clicked the string of Mexico', () => {
            const linktoHome = shallowWrapper.find('Link.mexico');
            expect(linktoHome.text().includes('Mexico')).toBe(true);
            expect(linktoHome.at(0).props().to).toBe('/mexico/products');
        });


    });

    describe('mount tests', () => {
        it('render the child component correctly', () => {
            const mountWrapper = mount(<MemoryRouter><WellcomePage /></MemoryRouter>);
            const wellcomeComponent = mountWrapper.find(WellcomeComponent);
            expect(wellcomeComponent.length).toBe(1);
        });

    });
});



