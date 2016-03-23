angular.module('app.constants', [])

.constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
    student: 'student_role',
    teacher: 'teacher_role'
});