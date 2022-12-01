<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Account settings for @{{ $store.state.username }}</h2>
      </header>
      <ChangeUsernameForm />
      <ChangePasswordForm />
    </section>
    <section>
      <header>
        <h2>Account management</h2>
      </header>
      <LogoutForm />
      <DeleteAccountForm />
      <FollowingContentForm />
      <RecommendedContentForm />
    </section>
  </main>
</template>

<script>
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import FollowingContentForm from '@/components/Account/FollowingContentForm.vue';
import RecommendedContentForm from '@/components/Account/RecommendedContentForm.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    RecommendedContentForm,
    FollowingContentForm,
    LogoutForm
  }
};
</script>


<style scoped>
main {
  background-color: rgb(225, 232, 237);
}
template {
  background-color: rgb(225, 232, 237);
}
</style>