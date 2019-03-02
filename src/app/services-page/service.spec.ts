import {} from 'jasmine';
import { ServicesPageComponent } from './services-page.component';

describe('ServicePageComponent', () => {
    it('#onsubmit() should toggle dataFromModalSent', () => {
        const comp = new ServicesPageComponent();
        expect(comp.dataFromModalSent).toBe(true, 'clicked');
        comp.onSubmit();
    });
});