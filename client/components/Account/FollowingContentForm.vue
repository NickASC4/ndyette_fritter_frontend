<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'FollowingContentForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'PATCH',
      hasBody: true,
      contentPreference: true,
      fields: [
        {id: 'followingContent', label: "Following Content", value: true}
      ],
      title: 'Increment Following Content',
      callback: () => {
        const message = 'Successfully incremented following content!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};

</script>