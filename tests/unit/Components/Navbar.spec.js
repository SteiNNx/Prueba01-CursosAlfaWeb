import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'

import Navbar from '@/components/Navbar'

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);
const router = new VueRouter();

describe('Vista Navbar', () => {
    it('Render Navbar', () => {
        const msg = 'Cursos AlfaWeb'
        const navbarWrapper = shallowMount(Navbar, {
            localVue,
            router,
            stubs: ['FontAwesomeIcon']
        });
        expect(navbarWrapper.text()).toMatch(msg)
    });
});
