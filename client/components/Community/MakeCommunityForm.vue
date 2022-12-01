
<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'MakeCommunityForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/communities',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'name', label: 'Name', value: ''}
      ],
      title: 'Create community',
      callback: () => {
        const message = 'Successfully created your community!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>