document.addEventListener("DOMContentLoaded", () => {
    // انتخاب تمام دکمه‌های منو و تمام بخش‌های محتوا
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // اضافه کردن رویداد کلیک به هر دکمه
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // جلوگیری از رفرش شدن صفحه

            // 1. حذف کلاس active از همه دکمه‌ها
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // 2. اضافه کردن کلاس active به دکمه کلیک شده
            button.classList.add('active');

            // 3. پیدا کردن آیدی تب مربوطه
            const targetId = button.getAttribute('data-target');

            // 4. مخفی کردن تمام تب‌ها و نمایش تب انتخاب شده با انیمیشن
            tabContents.forEach(content => {
                if (content.id === targetId) {
                    content.classList.add('active');
                    // اسکرول به بالای صفحه هنگام تعویض تب
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
});
